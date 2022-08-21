from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

CORS(
    app,
    supports_credentials=True
)

@app.route('/')
def index():
    return 'Hello World'

@app.route('/shift_generate', methods=["POST"])
def shift_generate():
    req = request.json
    staff_data = req.get("staff_data")
    required = req.get("required")
    conditions = req.get("conditions")
    print(staff_data)
    print(required)
    print(conditions)
    return {'result': 'ok'}

if __name__ == "__main__":
    app.run(debug=True)
