import pickle
import json
import numpy as np
import warnings


__locations = None
__seller_name = None
__type = None
__method = None
__data_columns = None
__model = None


def predict_price(suburb,seller,distance,rooms,bedroom,bathroom,car,landsize,yearBuilt):    
    try:
        sub_index = __data_columns.index(("Suburb_"+suburb).lower())
        seller_index = __data_columns.index(("SellerG_"+seller).lower())
    except:
        sub_index = -1
        seller_index = -1
  
    x = np.zeros(len(__data_columns))
    x[0] = distance
    x[1] = rooms
    x[2] = bedroom
    x[3] = bathroom
    x[4] = car
    x[5] = landsize
    x[6] = yearBuilt
    if sub_index >= 0:
        x[sub_index] = 1
    if seller_index >= 0:
        x[seller_index] = 1
        
    return round(__model.predict([x])[0],2)



def load_saved_artifacts():
    print("loading saved artifacts...start")
    global  __data_columns
    global __locations
    global __seller_name
    global __type 
    global __method

    with open("./artifacts/columns.json", "r") as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[7:214]  # skip 7 columns till 214
        __type = __data_columns[214:216]
        __method = __data_columns[216:220]
        __seller_name = __data_columns[220:]  # columns 220 onwards
   
    global __model
    if __model is None:
        with open('./artifacts/Melb_home_prices_model.pickle', 'rb') as f:
            __model = pickle.load(f)
    print("loading saved artifacts...done")

def get_location_names():
    return __locations

def get_seller_names():
    return __seller_name

def get_type_names():
    return __type

def get_method_names():
    return __method

def get_data_columns():
    return 

if __name__ == '__main__':
    warnings.filterwarnings("ignore")
    load_saved_artifacts()
    #print(get_location_names())
    #print(get_type_names())
    #print(get_method_names())
    #print(get_seller_names())
    print(predict_price('Flemington','Dingle',1,1,1,1,0,20,1920))