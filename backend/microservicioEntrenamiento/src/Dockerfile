FROM golang:1.16-alpine3.13 AS builder
WORKDIR /app
COPY . .
RUN go build -o training hello.go

# Run stage
FROM alpine:3.13
WORKDIR /app
COPY --from=builder /app/training .

EXPOSE 8000
CMD [ "/app/training" ]
