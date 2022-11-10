# Coonect to confluent cloud

def get_conf():
    return {'bootstrap.servers': 'pkc-n00kk.us-east-1.aws.confluent.cloud:9092',
        'sasl.mechanisms': 'PLAIN',
        'security.protocol': 'SASL_SSL',
        'sasl.username':'Z5D7V436FL6X627J',
        'sasl.password':'ZbB9pkDr+sHfauyuU30Rw6cRsjiLGY/NBw86yKIs68k8mx9U/ZuUMUIkLh8zQfnf',
        'group.id': 'listner',
        'auto.offset.reset': 'earliest'}
