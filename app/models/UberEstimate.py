from uber_rides.session import Session
from uber_rides.client import UberRidesClient
import Tuple
import requests


session = Session(server_token='ZaorUL2L_CCILlRtjHBrLz93-hTPIIBJHExq4C5m')
client = UberRidesClient(session)

# helper function to get data from Uber url
def get_json_data(slat, slong, elat, elong):

    headers = {'Authorization': 'Token ZaorUL2L_CCILlRtjHBrLz93-hTPIIBJHExq4C5m',
    'Accept-Language': 'en_US',
    'Content-Type': 'application/json'
    }

    resp = requests.get(
    'https://api.uber.com/v1.2/estimates/price?start_latitude=' + str(slat)
    + '&start_longitude=' + str(slong)
    + '&end_latitude=' + str(elat)
    + '&end_longitude=' + str(elong),
    headers=headers
    )

    # returns price data for UberX
    return resp.json().get('prices')[7]

# returns tuple that contains name of option (uberx) and estimated price and time
def get_uberx_estimate(slat, slong, elat, elong):

    json = get_json_data(slat, slong, elat, elong)
    low = json.get('low_estimate')
    high = json.get('high_estimate')
    avg = (low + high)/2
    time = json.get('duration') / 60
    # dist = json.get('distance')

    return Tuple.trip_info('uberx', avg, time)
