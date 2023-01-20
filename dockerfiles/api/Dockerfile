# syntax = docker/dockerfile:experimental
FROM python:latest
USER root

# apt mirror の変更(https://vividcode.hatenablog.com/entry/docker/docker-build-add-host)
RUN sed -i 's@archive.ubuntu.com@ftp.jaist.ac.jp/pub/Linux@g' /etc/apt/sources.list
RUN apt-get update
RUN apt-get -y install locales && \
    localedef -f UTF-8 -i ja_JP ja_JP.UTF-8
RUN apt-get install -y vim less
RUN apt-get install -y default-jdk
RUN apt-get install -y cron

ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja
ENV LC_ALL ja_JP.UTF-8
ENV TZ JST-9
ENV TERM xterm

RUN mkdir -p /root/src
COPY requirements.txt /root/src

ADD cron/python-cron /etc/cron.d/python-cron
RUN chmod 0644 /etc/cron.d/python-cron

RUN export PYTHONPATH=/root/src

ADD cron/script.sh /
ADD cron/init.sh /
ADD cron/python-cron /etc/cron.d/python-cron
RUN chmod +x /script.sh /init.sh

RUN crontab /etc/cron.d/python-cron

CMD /init.sh

WORKDIR /root/src

RUN apt install gcc
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y
ENV PATH "/root/.cargo/bin:$PATH"

RUN pip install --upgrade pip
RUN pip install --upgrade setuptools
RUN --mount=type=cache,mode=0755,target=/root/.cache/pip pip install -r requirements.txt
