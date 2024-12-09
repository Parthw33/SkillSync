from flask import Flask, request, jsonify
import os
from werkzeug.utils import secure_filename
from model import process_student_skills_from_file, recommend_students

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = "uploads/"
app.config["MAX_CONTENT_PATH"] = 10 * 1024 * 10  # 10MB file limit

# Ensure upload folder exists
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)


@app.route("/upload", methods=["POST"])
def upload_file():

    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    filename = secure_filename(file.filename)

    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)
    # Process the uploaded file for skill extraction
    student_skills = process_student_skills_from_file(filepath)
    slider_preferences = request.form.get("preferences", None)

    # Get recommendations
    recommended_students = recommend_students(student_skills, slider)

    return jsonify(recommended_students), 200


if __name__ == "__main__":
    app.run(debug=True)
