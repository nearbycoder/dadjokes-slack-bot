import fetch from 'node-fetch';
import { App } from '@slack/bolt';

export const run = async (event, context) => {
  const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
  });

  try {
    const response = await fetch('https://icanhazdadjoke.com/slack');

    const joke = await response.json();

    await app.client.chat.postMessage({
      channel: 'dadjokes',
      text: joke.attachments[0].text,
    });
  } catch (error) {
    console.log(error);
  }
};
