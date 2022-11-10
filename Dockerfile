FROM python:3.8

RUN apt-get update && \
  apt-get install -y --no-install-recommends gcc git libssl-dev g++ make && \
  cd /tmp && git clone https://github.com/edenhill/librdkafka.git && \
  cd librdkafka && git checkout tags/v1.9.0 && \
  ./configure && make && make install && ldconfig && \
  cd ../ && rm -rf librdkafka \
    && rm -r /var/lib/apt/lists/*

COPY requirements.txt /app/requirements.txt

WORKDIR /app
COPY . /app

RUN pip install --no-cache-dir -r requirements.txt

ENTRYPOINT [ "python" ]
