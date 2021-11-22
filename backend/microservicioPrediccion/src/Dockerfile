FROM golang:1.16-alpine3.13 AS builder
WORKDIR /app
COPY . .
RUN go build -o prediction hello.go

# Run stage
FROM alpine:3.13
WORKDIR /app
COPY --from=builder /app/prediction .

EXPOSE 9000
CMD [ "/app/prediction" ]
