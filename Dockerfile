FROM python:3.7-slim
RUN pip install --no-cache-dir notebook==5.*
COPY bindings/python/pydeck/requirements.txt /tmp/
RUN pip install --requirement /tmp/requirements.txt
RUN pip install ipywidgets
RUN jupyter nbextension enable --py widgetsnbextension
RUN jupyter nbextension install --py --symlink --sys-prefix pydeck
RUN jupyter nbextension enable --py --sys-prefix pydeck


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
