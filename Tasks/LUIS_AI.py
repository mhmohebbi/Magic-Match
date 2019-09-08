"""
Created on August 24th, 2019
@author: hossein.mohebbi
"""
import requests


class IntentFinder:
    def __init__(self, answer):
        self.answer = answer
        self.analysis = None

        headers = {
            # Request headers
            'Ocp-Apim-Subscription-Key': 'f8f92351b781402a8a48272faaf3c572',
        }

        params = {
            # Query parameter
            'q': self.answer,
            # Optional request parameters, set to default values
            'timezoneOffset': '0',
            'verbose': 'false',
            'spellCheck': 'true',
            'staging': 'false',
        }

        try:
            r = requests.get(
                'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/1b0e9f5f-c974-46b1-9081-ba1202a17dee?verbose=true&timezoneOffset=-360&subscription-key=f8f92351b781402a8a48272faaf3c572&',
                headers=headers, params=params)
            self.analysis = r.json()

        except Exception as e:
            print("[Errno {0}] {1}".format(e.errno, e.strerror))

    def top_scoring_intent(self):
        #print(self.analysis['topScoringIntent'])
        return self.analysis['topScoringIntent']

    def find_intent_score(self, desired_intent):
        score = 0
        intents = self.analysis['intents']
        intent_len = len(intents)
        for i in range(intent_len):
            current_intent = intents[i]
            if current_intent['intent'] == desired_intent:
                score = current_intent['score']

        return score

    def sentimental_score(self):
        return self.analysis['sentimentAnalysis']['score']


"TEST"
x = IntentFinder("I like the internet of things or IOT. I think it's cool and has room for growth")
print(x.analysis)
