from flask import Flask, request,jsonify
import util

app = Flask(__name__)

@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/get_seller_names', methods=['GET'])
def get_seller_names():
    response = jsonify({
        'locations': util.get_seller_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


@app.route('/predict_price', methods=['GET', 'POST'])
def predict_price():
    suburb = request.form['suburb']
    seller = request.form['seller']
    distance = float(request.form['distance'])
    rooms = int(request.form['rooms'])
    bedroom = int(request.form['bedroom'])
    bathroom = int(request.form['bathroom'])
    car = int(request.form['car'])
    landsize = float(request.form['landsize'])
    yearBuilt = int(request.form['yearBuilt'])

    response = jsonify({
        'estimated_price': util.predict_price(suburb,seller,distance,rooms,bedroom,bathroom,car,landsize,yearBuilt)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


@app.route('/hello')
def hello():
    return "Hi"

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts()
    app.run()