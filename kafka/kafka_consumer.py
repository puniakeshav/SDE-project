from confluent_kafka import Consumer

from kafka.kafka import get_conf

# Create Consumer instance
conf = get_conf()
c = Consumer(conf)


def consume_message(topic, callback):
    c.subscribe([topic])
    try:
        while True:
            msg = c.poll(1.0)
            if msg is None:
                continue
            if msg.error():
                print("Consumer error: {}".format(msg.error()))
                continue
            callback(msg)
            print('Received message: {}'.format(msg.value().decode('utf-8')))
    except KeyboardInterrupt:
        pass
    finally:
        # Close down consumer to commit final offsets.
        c.close()

# Test Consume Message
# test_topic = "query_input"
# consume_message(test_topic, lambda msg: print(msg))