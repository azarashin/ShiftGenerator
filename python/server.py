from flask import Flask, request, jsonify
from flask_cors import CORS

from shift_generator_task_manager import ShiftGeneratorTaskManager

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

CORS(
    app,
    supports_credentials=True
)

shift_generator = ShiftGeneratorTaskManager()

@app.route('/')
def index():
    return 'Hello World'

@app.route('/shift_generate', methods=["POST"])
def shift_generate():
    req = request.json
    staff_slots = req.get("staff_slots")
    required = req.get("required")
    conditions = req.get("conditions")
    names = [d['name'] for d in staff_slots]
    print(staff_slots)
    print(required)
    print(conditions)
    
    result = shift_generator.generate_shift(names, staff_slots, required, conditions)
    if result:
        return {'result': 'ok'}
    else:
        return {'result': 'ng'}

if __name__ == "__main__":
    app.run(debug=True)
