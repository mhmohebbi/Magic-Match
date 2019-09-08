"""
Created on August 24th, 2019
@author: hossein.mohebbi
"""


def compare_profiles(main_profile, other_profile):
    profile_sums = 0
    # self.profile_len = len(main_profile)

    for feature in main_profile:
        if feature in ['LikesC#', 'LikesC++', 'LikesPHP', 'LikesC', 'LikesJava',
                       'LikesJavaScript', 'LikesPython', 'LikesHtmlCss', 'LowExperience',
                       'HighExperience', 'IAmHighSchoolStudent', 'IAmUniversityStudent']:
            profile_sums = abs(main_profile[feature] - other_profile[feature]) * (-1)
        else:
            profile_sums = abs(main_profile[feature] - other_profile[feature])

    return profile_sums

