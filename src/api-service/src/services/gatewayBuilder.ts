import { ISecretsManagerGateway, MockSecretsManagerGateway, SecretsManagerGateway } from '../gateways/secretsManagerGateway';
import { EmailGateway, IEmailGateway, MockEmailGateway } from '../gateways/emailGateway';
import { config } from '../Config';

export async function buildSercretsManagerGateway(): Promise<ISecretsManagerGateway> {
  if (config.environment === 'test') {
    return new MockSecretsManagerGateway();
  } else {
    return new SecretsManagerGateway();
  }
}

export async function emailServiceGateway(): Promise<IEmailGateway> {
  if (config.environment === 'test') {
    return new MockEmailGateway();
  } else {
    return new EmailGateway();
  }
}
