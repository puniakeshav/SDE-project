from flask import Flask, jsonify, request, make_response
from flask_restful import Resource, Api
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room

import uuid
import sys
import os

cdir = os.getcwd()
sys.path.insert(1,os.path.join(cdir))

from kafka.kafka_producer import produce_maessage


# creating the flask app
app = Flask(__name__)
CORS(app)
# creating an API object
socketio = SocketIO(app)
api = Api(app)

class Predict(Resource):
    def post(self):
        data = request.get_json()
        # request data will have app_id and array of quries
        if not data or not 'app_id' in data or not 'queries' in data:
            return make_response(jsonify({'error': 'Missing app_id or queries'}), 400)
        app_id = data['app_id']
        queries = data['queries']
        if not isinstance(queries, list):
            return make_response(jsonify({'error': 'queries should be an array'}), 400)

        transcation_id = uuid.uuid4()
        messages = []
        for query in queries:
            message = {
                "key" : app_id,
                "value": {
                    'app_id': app_id,
                    'transcation_id': str(transcation_id),
                    'query': query
                }
            }
            messages.append(message)
        produce_maessage("query_input", messages)

        return make_response(jsonify({'response': f"Started Processing {len(queries)} Quries for App {app_id}","transaction_id": transcation_id}), 201)

@socketio.on('join')
def on_join(data):
    channel = data['transcation_id']
    join_room(channel)

class Message(Resource):
    def post(self):
        data = request.get_json()
        if not data or not "transcation_id" in data:
            return make_response(jsonify({'error': 'Missing'}), 400)
        room = data['transcation_id']
        socketio.emit('message', data['transcation_id'], room=room)

api.add_resource(Predict, '/api/')
api.add_resource(Message,'/message/')


# driver function
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 80))
    app.run(debug=True, host='0.0.0.0', port=port)
