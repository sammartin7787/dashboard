from django.shortcuts import render
from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from DashBoard import settings

from collections import OrderedDict
from models import *
import json

import names
import random
import os


import string

from users import *


# Create your views here.

data = ''

def MSC_Clear_Codes(request):

    return render_to_response('index.html', locals())


@csrf_exempt
def login(request):
    data = json.loads(request.body)

    res = dict()

    res['login'] = "failed"
    for username in user_list.keys():
        if data['username'] == username and data['password'] == user_list[username]:
            res['login'] = "success"
            break;

    res = json.dumps(res)

    return HttpResponse(res)


def users(request):
    data = getRandomData()

    if fake_data_flag == True:
        res = json.dumps(data)
    else:
        res = []

    return HttpResponse(res)



def reports(request):
    data = getRandomData()
    res = dict()

    # get lead score info for pie chart
    lead_score = {'1-10': 0, '11-20': 0, '21-30': 0, '31-40': 0, '41-50': 0, '51-60': 0, '61-70': 0, '71-80': 0, '81-90': 0, '91-100': 0, }
    for element in data:
        if element['lead_score'] > 0 and element['lead_score'] <= 10:
            lead_score['1-10'] += 1
        elif element['lead_score'] <= 20:
            lead_score['11-20'] += 1
        elif element['lead_score'] <= 30:
            lead_score['21-30'] += 1
        elif element['lead_score'] <= 40:
            lead_score['31-40'] += 1
        elif element['lead_score'] <= 50:
            lead_score['41-50'] += 1
        elif element['lead_score'] <= 60:
            lead_score['51-60'] += 1
        elif element['lead_score'] <= 70:
            lead_score['61-70'] += 1
        elif element['lead_score'] <= 80:
            lead_score['71-80'] += 1
        elif element['lead_score'] <= 90:
            lead_score['81-90'] += 1
        elif element['lead_score'] <= 100:
            lead_score['91-100'] += 1


    res['lead_score'] = lead_score

    # get aggregated data by geo city
    temp = dict()
    for element in data:
        if element['found_postal']['city'] in temp.keys():
            temp[element['found_postal']['city']] +=1
        else:
            temp[element['found_postal']['city']] = 0

    res['geo_city'] = OrderedDict(sorted(temp.items(), key=lambda t: t[1], reverse=True))
    print res['geo_city']
    # get aggregated data by salary
    temp = dict()
    for element in data:
        if element['salary'] in temp.keys():
            temp[element['salary']] +=1
        else:
            temp[element['salary']] = 0

    res['salary'] = OrderedDict(sorted(temp.items(), key=lambda t: t[1], reverse=True))


    # get aggregated data by interest
    temp = dict()
    for element in data:
        if element['interests'] in temp.keys():
            temp[element['interests']] +=1
        else:
            temp[element['interests']] = 0
    res['interests'] = OrderedDict(sorted(temp.items(), key=lambda t: t[1], reverse=True))

    # get aggregated data by home_owner_status
    temp = dict()
    for element in data:
        if element['demographics']['home_owner_status'] in temp.keys():
            temp[element['demographics']['home_owner_status']] +=1
        else:
            temp[element['demographics']['home_owner_status']] = 0
    res['home_owner_status'] = OrderedDict(sorted(temp.items(), key=lambda t: t[1], reverse=True))

    # get aggregated data by education
    temp = dict()
    for element in data:
        if element['education'] in temp.keys():
            temp[element['education']] +=1
        else:
            temp[element['education']] = 0
    res['education'] = OrderedDict(sorted(temp.items(), key=lambda t: t[1], reverse=True))

    # get aggregated data by occupation
    temp = dict()
    for element in data:
        if element['demographics']['occupation'] in temp.keys():
            temp[element['demographics']['occupation']] +=1
        else:
            temp[element['demographics']['occupation']] = 0
    res['occupation'] = OrderedDict(sorted(temp.items(), key=lambda t: t[1], reverse=True))

     # get aggregated data by date
    temp = dict()
    for element in data:
        if element['time_subscribed'] in temp.keys():
            temp[element['time_subscribed']] +=1
        else:
            temp[element['time_subscribed']] = 0
    res['time_subscribed'] = temp

    res = json.dumps(res)
    return HttpResponse(res)

@csrf_exempt
def upload(request):
    file = request.FILES['file']

    temp = settings.BASE_DIR + '/report' + settings.STATIC_URL + 'upload'

    if not os.path.exists(temp):
        os.makedirs(temp)

	filename = file._get_name()

	fd = open('%s/%s' % (temp, str(filename)), 'wb')
	for chunk in file.chunks():
		fd.write(chunk)
	fd.close()

@csrf_exempt
def profile(request):
    res = dict()

    res['energy'] = {
        'Epic': [0, 0, 0, 0, 0, 0.00006, 0.00011, 0.00032, 0.00110, 0.00235, 0.00369, 0.00640,
                0.01005, 0.01436, 0.02063, 0.03057, 0.04618, 0.06444, 0.09822, 0.15468, 0.20434, 0.24126,
                0.27387, 0.29459, 0.31056, 0.31982, 0.32040, 0.31233, 0.29224, 0.27342, 0.26662,
                0.26956, 0.27912, 0.28999, 0.28965, 0.27826, 0.25579, 0.25722, 0.24826, 0.24605,
                0.24304, 0.23464, 0.23708, 0.24099, 0.24357, 0.24237, 0.24401, 0.24344, 0.23586,
                0.22380, 0.21004, 0.17287, 0.14747, 0.13076, 0.12555, 0.12144, 0.11009, 0.10950,
                0.10871, 0.10824, 0.10577, 0.10527, 0.10475, 0.10421, 0.10358, 0.10295, 0.10104],
        'MainStream':[0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                    0.00005, 0.00025, 0.00050, 0.01020, 0.00150, 0.00200, 0.00426, 0.00660, 0.00869, 0.01060, 0.01605, 0.02471, 0.03322,
                    0.04238, 0.05221, 0.06129, 0.07089, 0.08339, 0.09399, 0.10538, 0.11643, 0.13092, 0.14478,
                    0.15915, 0.17385, 0.19055, 0.21205, 0.23044, 0.25393, 0.27935, 0.30062, 0.32049,
                    0.33952, 0.35804, 0.37431, 0.39197, 0.45000, 0.43000, 0.41000, 0.39000, 0.37000,
                    0.35000, 0.33000, 0.31000, 0.29000, 0.27000, 0.25000, 0.24000, 0.23000, 0.22000,
                    0.21000, 0.20000, 0.19000, 0.18000, 0.18000, 0.17000, 0.16000]
    }

    res['interests'] = {
        'Saving': random.randint(1, 100),
        'Security': random.randint(1, 100),
        'Home Improvement': random.randint(1, 100),
        'Neighbor Influence': random.randint(1, 100)
    }

    res['tpyeofsys'] = {
        'system':{
            'kw': random.randint(3, 7),
            'price': random.randint(1000, 99999)
        },
        'lilon':{
            'kw': random.randint(3, 7),
            'price': random.randint(1000, 99999)
        }
    }

    res['profile_image'] = 'images/person/default.png'

    res = json.dumps(res)
    return HttpResponse(res)

def getRandomStr(size):
    return ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(size))



def getRandomData():
    res = []
    gender = ['Male', 'Female']
    location = ['USA', 'Canada', 'Austria', 'France', 'Italy']
    state = ['AL', 'AK', 'CA', 'CO', 'GA', 'HI', 'IL']
    city = ['Montgomery', '	Juneau', 'Phoenix', 'Little Rock', 'Sacramento', 'Denver', 'Hartford', 'Dover']
    interests = ['Sports', 'Music', 'Art', 'Study', 'Teach']
    home_owner_status = ['Owner', 'Rent']
    education = ['University', 'College', 'Middle School']
    occupation = ['Professional', 'Architect', 'Auditor', 'Cabinet Maker', 'Care Taker', 'Composer', 'Electrician', 'Historian']
    salary = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
    date = ['2016-1-2 00:00:00', '2016-1-3 00:00:00', '2016-1-4 00:00:00', '2016-1-12 00:00:00', '2016-1-10 00:00:00', '2016-1-15 00:00:00']
    for i in range(0, 100):
        data = {
            'full_name': names.get_full_name(),
            'phone_number': str(random.randrange(11111111111, 99999999999)),
            'email': "%s@%s.com" % (getRandomStr(5), getRandomStr(3)),
            'location': random.choice(location),
            'time_subscribed': random.choice(date),
            'link_to_google_maps_location': 'https://maps.google.com/',
            'lead_score': random.randint(1, 100),
            'interests': random.choice(interests),
            'education': random.choice(education),
            'salary': '$%d' % random.choice(salary),
						'solar_panel': 'n/a currently',
						'energy_consumption': 'n/a currently',
						'interest_in_solar,': 'n/a currently',
						'neighborhood': 'n/a currently',
						'probability': 'n/a currently',
						'notes': 'n/a currently',
            "demographics":{
                "age": random.randint(10, 80),
                "gender": random.choice(gender),
                "occupation": random.choice(occupation),
                "children": "No",
                "household_income": "75k-100k",
                "marital_status": "Single",
                "home_owner_status":  random.choice(home_owner_status),
                "velocity": "7",
            },
            "found_postal": {
                "address1": "100 MAIN ST APT 3",
                "address2": '',
                "city": random.choice(city),
                "state": random.choice(state),
                "zip": "%d" % random.randint(11111, 99999),
            },
        }

        res.append(data)
    return res

