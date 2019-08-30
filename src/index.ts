/**
 * Copyright 2019 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Plugin, DialogflowApp, Contexts, DialogflowConversation, Response } from 'actions-on-google'
import * as smd from 'speechmarkdown-js'

const SSML_START_TAG = "<speak>"

const options = {
  platform: 'google-assistant'
}
const speech = new smd.SpeechMarkdown()

const processResponse = (handler: Function, ...responses: Response[]) => {
  if (responses.length !== 1) {
    handler(...responses)
  }
  if (typeof responses[0] === 'string') {
    const simpleResponse = responses[0] as string
    if (simpleResponse.startsWith(SSML_START_TAG)) {
      // SSML already
      handler(simpleResponse)
    } else {
      // Convert SMD to SSML
      handler(speech.toSSML(responses[0] as string, options))
    }
  }
}

export const speechMarkdownHelper = (): Plugin<
  DialogflowApp<{}, {}, Contexts, DialogflowConversation<{}, {}>>,
  {}> => {
    return (app) => {
      app.middleware(conv => {
        const convAsk = conv.ask.bind(conv)
        const convClose = conv.close.bind(conv)

        // Override functions
        conv.ask = (...responses: Response[]) => {
          processResponse(convAsk, ...responses)
          return conv
        }
        conv.close = (...responses: Response[]) => {
          processResponse(convClose, ...responses)
          return conv
        }
      })
    }
  }
