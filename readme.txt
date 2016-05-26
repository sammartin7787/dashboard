Backend: django
Front end: Angularjs

1. Working environment

	python2.7x
	django 1.9.4
	pycharm

 - Install pycharm

		https://gist.github.com/shafi-codez/9788135 

2. Run server

		In dashboard/, run the following command

		$ sudo python manage.py runserver 0.0.0.0:80

 - Test file upload in local server.
    In data tab, you can check file upload in the firth tile.
    After you choose file by clicking 'choose file' button, you can see the uploaded file in \dashboard\report\static\upload.
	
3. Json format for users

				{
            'full_name': 'alexey golovin',
            'phone_number': '2343234',
            'email': 'opsdf@gmail.com',
            'location': 'russia',
            'time_subscribed': '2016-2-3 00:23:12',
            'link_to_google_maps_location': 'https://maps.google.com/',
            'lead_score': 88,
            'interests': 'sports',
            'education': 'university',
            'salary': '$2000',
            "demographics":{
                "age": 29,
                "gender": 'man',
                "occupation": 'freelancer',
                "children": "No",
                "household_income": "75k-100k",
                "marital_status": "Single",
                "home_owner_status":  'Rent',
                "velocity": "7",
            },
            "found_postal": {
                "address1": "100 MAIN ST APT 3",
                "address2": '',
                "city": 'moscow',
                "state": 'moscow',
                "zip": '213432',
            },
        }

3. Json format for geo city, by salary, by interests,home_owner_status,education,occupation ...

				{
						'city1': number of users,
						'city2':  number of users,
						...
				}

		Other things have same format.

4. Json format for profile page

    {
        'energy': {

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

        'interests': {
                'Saving': 34,
                'Security': 23,
                'Home Improvement': 45,
                'Neighbor Influence': 63
            }

        'tpyeofsys': {
                'system':{
                    'kw': 4,
                    'price': 23523
                },
                'lilon':{
                    'kw': 3,
                    'price': 32521
                }
            }

        'profile_image': 'images/person/default.png'
    }
