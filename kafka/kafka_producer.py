from kafka.kafka import get_conf
from confluent_kafka import Producer
import json

# Create Producer instance
conf = get_conf()
p = Producer(**conf)

def acked(err, msg):
    if err is not None:
        print("Failed to deliver message: {}".format(err.str()))
    else:
        print("Message produced: {}".format(msg.value()))

def produce_maessage(topic, values):
    if type(values) != type([]):
        values = [values]
    for val in values:
        key = val['key']
        value = json.dumps(val['value'])
        p.produce(topic, key=key, value=value, callback=acked)
        p.poll(0)
    p.flush()

# Test Produce Message

test_meaasge = [
    {'key': 'key1', 'value': 'value1'},
    {'key': 'key2', 'value': 'value2'},
]

test_topic = "query_input"

# produce_maessage(test_topic, test_meaasge)