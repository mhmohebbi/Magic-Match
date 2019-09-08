"""
Created on August 24th, 2019
@author: hossein.mohebbi
"""
from Tasks.build_profile import ProfileBuilder
from Tasks.compare_profiles import compare_profiles
import json
import os
import pyodbc
from time import sleep


class Main:
    def __init__(self):
        with open('team.json', 'w') as outfile:
            json.dump({}, outfile)

        lastKnownSizeOfFile = os.path.getsize('db.json')
        # print(os.path.getsize('judge.txt'))

        while os.path.getsize('db.json') == lastKnownSizeOfFile:
            sleep(1)
        sleep(1)
        with open('db.json') as json_file:
            data = json.load(json_file)

            print(data)

        length = len(data['users'])
        self.main_user = data["users"][length-1]

        server = 'matchdb.database.windows.net'
        database = 'db'
        username = 'mhmohebbi'
        password = 'hackthe6ix'
        driver = '{ODBC Driver 17 for SQL Server}'
        cnxn = pyodbc.connect(
            'DRIVER=' + driver + ';SERVER=' + server + ';PORT=1433;DATABASE=' + database + ';UID=' + username + ';PWD=' + password)
        cursor = cnxn.cursor()
        self.other_users = cursor.fetchone()

        self.answers = self.main_user['answers']
        self.teammates_needed_num = int(self.answers[2])
        del self.answers[2]
        del self.answers[1]
        self.main_profile = ProfileBuilder(self.answers).profile

        self.other_users_len = len(self.other_users)
        self.match_scores = []
        self.match_data = []

        # order still maintained
        for i in range(self.other_users_len):
            self.match_data.append((compare_profiles(self.main_profile, ProfileBuilder(self.other_users[i]['answers']).profile),
                                      self.other_users[i]['username'],
                                      self.other_users[i]['first name'],
                                      self.other_users[i]['last name']))

            self.match_scores.append(compare_profiles(self.main_profile, ProfileBuilder(self.other_users[i]['answers']).profile))

        self.team = {"members": []}
        self.interests = ["Similar Technological Interests!", "New Coder, but Eager Learner!", "Experienced Developer",
                        "Strong Education", "Backend Developer!", "Similar Level of Experience!", "FrontEnd Developer!",
                        "Experienced Developer", "Similar Technological Interests!", "Strong Education and Experience"]
        self.image_links = ['https://www.face-agency.co.uk/images/uploads/models/large/1539856973-21.jpg',
                            'https://img.ohmymag.co.uk/article/480/viral/thylane-blondeau-the-young-french-woman-elected-most-beautiful-face-of-2018_59efc87e03874efb6b259b053bb3257c16cf6abf.jpg',
                            'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjxlY_CrJ3kAhWidt8KHYLKBhgQjRx6BAgBEAQ&url=https%3A%2F%2Fpixabay.com%2Fphotos%2Fsmile-profile-face-male-portrait-1726471%2F&psig=AOvVaw1eZvlmOjqSe-o3msqVGsOf&ust=1566799338435289',
                            'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwijjNfKrJ3kAhUBhOAKHZl2DOUQjRx6BAgBEAQ&url=https%3A%2F%2Flucknowtutorial.com%2FTutor%2FLucknow%2FJankipuram%2F216&psig=AOvVaw1eZvlmOjqSe-o3msqVGsOf&ust=1566799338435289',
                            'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjzi77TrJ3kAhVoUN8KHWqxBzgQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.rd.com%2Fadvice%2Frelationships%2Fonline-dating-profile-photos%2F&psig=AOvVaw1GR-SwGSt-AnuXVA_N5C53&ust=1566799376189574',
                            'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiprqLsrJ3kAhXldd8KHXiNDp4QjRx6BAgBEAQ&url=https%3A%2F%2Fcccmaker.com%2Fmakerspace-profile-kevin-renteria%2F&psig=AOvVaw0v0ncGHC1L7JasmRLhYZTg&ust=1566799405005680',
                            'http://www.hosseinmohebbi.com/profile1.jpg',
                            'https://bittaxer.com/wp-content/uploads/2018/03/danielle-profile-bittaxer.jpg',
                            'http://view.factsmgt.com/ch-me/staff186_2.jpg',
                            'https://avatars3.githubusercontent.com/u/8812246?s=460&v=4',
                            'https://cmuchippewas.com/images/2018/11/13/Grahovac_t_cm_2018H_345_020.jpg?width=300']

        # need to track name and user name
        self.match_scores.sort()
        for i in range(self.teammates_needed_num):
            for j in range(self.other_users_len):
                if self.match_scores[i] == self.match_data[j][0]:
                    self.team['members'].append({"userName": self.match_data[j][1],
                                      "firstName": self.match_data[j][2],
                                      "lastName": self.match_data[j][3],
                                      "interest": self.interests[j],
                                      "pic": self.image_links[j]})

        with open('team.json', 'w') as outfile:
            json.dump(self.team, outfile)


if __name__ == '__main__':
    window = Main()
    print(window.team)
