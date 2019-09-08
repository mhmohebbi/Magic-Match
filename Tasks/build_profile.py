"""
Created on August 24th, 2019
@author: hossein.mohebbi
"""
from Tasks.LUIS_AI import IntentFinder


class ProfileBuilder:
    def __init__(self, answer_list):
        self.answers = answer_list

        self.intents = ['HighExperience', 'IAmHighSchoolStudent', 'IAmUniversityStudent',
                        'LikesAR/VR', 'LikesBioInformatics', 'LikesBlockChain', 'LikesC',
                        'LikesC#', 'LikesC++', 'LikesFinTech', 'LikesGaming', 'LikesPHP',
                        'LikesHealthTech', 'LikesHtmlCss', 'LikesIOT', 'LikesJava',
                        'LikesJavaScript', 'LikesML/AI', 'LikesPython', 'LikesQuantum',
                        'LikesUI/UX', 'LowExperience']

        # based off azure luis intents
        self.profile = {'HighExperience': 0, 'IAmHighSchoolStudent': 0, 'IAmUniversityStudent': 0,
                        'LikesAR/VR': 0, 'LikesBioInformatics': 0, 'LikesBlockChain': 0, 'LikesC': 0,
                        'LikesC#': 0, 'LikesC++': 0, 'LikesFinTech': 0, 'LikesGaming': 0, 'LikesPHP': 0,
                        'LikesHealthTech': 0, 'LikesHtmlCss': 0, 'LikesIOT': 0, 'LikesJava': 0,
                        'LikesJavaScript': 0, 'LikesML/AI': 0, 'LikesPython': 0, 'LikesQuantum': 0,
                        'LikesUI/UX': 0, 'LowExperience': 0, 'sentimentAnalysis': 0}

        self.build_profile()

    def update_profile_score(self, answer):
        luis = IntentFinder(answer)

        for intent in self.intents:
            score = luis.find_intent_score(intent)
            self.profile[intent] += score
        score = luis.sentimental_score()
        self.profile['sentimentAnalysis'] += score

    def build_profile(self):
        for answer in self.answers:
            self.update_profile_score(answer)

'''
x = ProfileBuilder(["I like Python", "I'm in highschool", "I think data science is nice", "Im happy", "I'm new to coding"])

print(x.profile)'''