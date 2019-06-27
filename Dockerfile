FROM python:3.7-slim
RUN pip install --no-cache-dir notebook==5.*
COPY bindings/python/pydeck/requirements.txt /tmp/
RUN pip install --requirement /tmp/requirements.txt
RUN jupyter nbextension install --py --symlink --sys-prefix pydeck
RUN jupyter nbextension enable --py --sys-prefix pydeck
ADD https://gist.githubusercontent.com/ajduberstein/8d729f9e82f8cde2063b18a8eefa0dde/raw/beba4192c3ece5304853ce4f8d7036fe114d0673/Binder%2520Mapbox%2520API%2520Key api_key
RUN export MAPBOX_API_KEY=$(cat api_key)

ARG NB_USER=jovyan
ARG NB_UID=1000
ENV USER ${NB_USER}
ENV NB_UID ${NB_UID}
ENV HOME /home/${NB_USER}

RUN adduser --disabled-password \
    --gecos "Default user" \
    --uid ${NB_UID} \
    ${NB_USER}

ENV HOME=/tmp
COPY . ${HOME}

USER root
RUN chown -R ${NB_UID} ${HOME}
USER ${NB_USER}
