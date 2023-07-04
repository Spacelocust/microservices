// import otel from '@opentelemetry/api';
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import process from 'process';
import { GrpcInstrumentation } from '@opentelemetry/instrumentation-grpc';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { WinstonInstrumentation } from '@opentelemetry/instrumentation-winston';
import { registerInstrumentations } from '@opentelemetry/instrumentation';

import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { PrismaInstrumentation } from '@prisma/instrumentation';

import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: `${process.env.npm_package_name}-${process.env.NODE_ENV}`,
  [SemanticResourceAttributes.SERVICE_VERSION]: process.env.npm_package_version,
});

const provider = new NodeTracerProvider({
  resource,
});

const exporter = new OTLPTraceExporter({
  url: process.env.JAEGER_URL || 'http://localhost:4317',
});

provider.addSpanProcessor(new SimpleSpanProcessor(exporter) as any);
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()) as any);
provider.register();

registerInstrumentations({
  instrumentations: [
    new WinstonInstrumentation(),
    new GrpcInstrumentation(),
    // new PrismaInstrumentation(),
  ],
});

// // gracefully shut down the SDK on process exit
process.on('SIGTERM', () => {
  provider
    .shutdown()
    .then(
      () => console.log('SDK shut down successfully'),
      (err) => console.log('Error shutting down SDK', err),
    )
    .finally(() => process.exit(0));
});
