FROM node:14.15.4

RUN apt-get update
RUN apt-get install -y locales
RUN apt-get update
RUN apt-get install -y curl

RUN yarn install

RUN locale-gen ja_JP.UTF-8
RUN localedef -f UTF-8 -i ja_JP ja_JP
ENV LANG ja_JP.UTF-8
ENV TZ Asia/Tokyo
WORKDIR /server-monitoring