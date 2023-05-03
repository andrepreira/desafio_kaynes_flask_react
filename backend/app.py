from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__, static_folder='../frontend/build')
CORS(app)

openai.api_key = "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"

def generate_text(prompt):
    response = openai.Completion.create(
      engine="davinci",
      prompt=prompt,
      temperature=0.5,
      max_tokens=1024,
      top_p=1,
      frequency_penalty=0,
      presence_penalty=0
    )
    return response.choices[0].text

@app.route('/api/generate_text', methods=['POST'])
def handle_generate_text():
    prompt = request.json['prompt']
    try:
        print(prompt)
        output = generate_text(prompt)
        print(output)
        return jsonify({'output': output})
    except Exception as e:
        print(dir(e))
        print(e.http_body)
        return jsonify({'error': e.http_body,'message': str(e.user_message), 'status_code': int(e.http_status) }), e.http_status
