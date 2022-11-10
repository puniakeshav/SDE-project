import sys
import os

cdir = os.getcwd()
sys.path.insert(1,os.path.join(cdir))

from kafka.kafka_consumer import consume_message
from kafka.kafka_producer import produce_maessage
from consumer_service.predict import predict
import json

def make_prediction(message):
    print(message.value())
    if not message:
        return
    # try:
    message = json.loads(message.value())
    if not "query" in message or not "app_id" in message:
        return

    query = message["query"]
    app_id = message["app_id"]
    result = predict([['','',app_id,query,'']])

    message["result"] = result
    res = {
        "key": app_id,
        "value": message
    }
    produce_maessage("query_processed", res)
    
    # except:
        # pass

consume_message("query_input",make_prediction)