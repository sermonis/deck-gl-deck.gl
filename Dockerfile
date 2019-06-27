FROM python:3.7-slim
RUN pip install --no-cache notebook
ENV HOME=/tmp
COPY bindings/python/pydeck/requirements.txt /tmp/
RUN pip install --requirement /tmp/requirements.txt
