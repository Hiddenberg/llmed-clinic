FROM --platform=arm64 alpine:latest AS downloader

RUN apk add --no-cache unzip wget curl

WORKDIR /db
RUN wget https://github.com/pocketbase/pocketbase/releases/download/v0.29.2/pocketbase_0.29.2_linux_arm64.zip
RUN unzip pocketbase_0.29.2_linux_arm64.zip


FROM --platform=arm64 alpine:latest

WORKDIR /db
COPY --from=downloader /db/pocketbase /usr/local/bin/pocketbase
COPY ./pb_migrations /db/pb_migrations

EXPOSE 8080

CMD ["pocketbase", "serve", "--http", "0.0.0.0:8080"]