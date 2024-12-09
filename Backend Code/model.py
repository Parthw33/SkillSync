from flask import Flask, request, jsonify
from flask_cors import CORS
import pdfplumber
import pickle
import os
import pandas as pd


with open("trained_model.pkl", "rb") as model_file:
    model = pickle.load(model_file)

with open("vectorizer.pkl", "rb") as vectorizer_file:
    vectorizer = pickle.load(vectorizer_file)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

students_data = [
    {
        "name": "Parth",
        "skills": {
            "python": 80,
            "machine learning": 90,
            "aws": 70,
            "data analysis": 75,
            "cloud computing": 68,
            "javascript": 78,
            "react": 82,
            "sql": 80,
        },
    },
    {
        "name": "Aisha",
        "skills": {
            "java": 85,
            "spring": 78,
            "aws": 72,
            "microservices": 88,
            "docker": 65,
            "kubernetes": 70,
            "sql": 74,
        },
    },
    {
        "name": "Ravi",
        "skills": {
            "python": 88,
            "data science": 90,
            "r": 80,
            "tableau": 72,
            "sql": 85,
            "big data": 67,
        },
    },
    {
        "name": "Liam",
        "skills": {
            "javascript": 82,
            "node.js": 78,
            "express": 75,
            "react": 85,
            "mongodb": 80,
            "html": 87,
            "css": 88,
        },
    },
    {
        "name": "Emma",
        "skills": {
            "c++": 92,
            "python": 80,
            "algorithms": 85,
            "data structures": 89,
            "sql": 74,
            "system design": 78,
        },
    },
    {
        "name": "Sophia",
        "skills": {
            "aws": 85,
            "cloud computing": 78,
            "devops": 82,
            "terraform": 74,
            "ansible": 70,
            "docker": 80,
            "linux": 79,
        },
    },
    {
        "name": "Noah",
        "skills": {
            "c#": 87,
            ".net": 85,
            "azure": 80,
            "sql": 78,
            "javascript": 76,
            "html": 85,
            "css": 82,
        },
    },
    {
        "name": "Olivia",
        "skills": {
            "machine learning": 88,
            "python": 92,
            "nlp": 80,
            "tensorflow": 70,
            "pytorch": 75,
            "data wrangling": 73,
        },
    },
    {
        "name": "Mason",
        "skills": {
            "java": 78,
            "spring": 80,
            "hibernate": 76,
            "sql": 80,
            "kotlin": 70,
            "android development": 88,
        },
    },
    {
        "name": "Isabella",
        "skills": {
            "javascript": 84,
            "vue.js": 88,
            "html": 89,
            "css": 86,
            "typescript": 80,
            "axios": 74,
        },
    },
    {
        "name": "Elijah",
        "skills": {
            "aws": 76,
            "terraform": 82,
            "docker": 80,
            "cloud formation": 68,
            "python": 73,
            "devops": 77,
            "linux": 82,
        },
    },
    {
        "name": "Amelia",
        "skills": {
            "data science": 84,
            "r": 88,
            "python": 79,
            "sql": 83,
            "machine learning": 80,
            "tableau": 72,
        },
    },
    {
        "name": "James",
        "skills": {
            "javascript": 82,
            "react": 85,
            "redux": 78,
            "node.js": 75,
            "express": 80,
            "mongodb": 70,
        },
    },
    {
        "name": "Charlotte",
        "skills": {
            "cybersecurity": 85,
            "network security": 88,
            "firewalls": 80,
            "aws": 70,
            "python": 74,
            "penetration testing": 82,
        },
    },
    {
        "name": "Henry",
        "skills": {
            "c++": 89,
            "algorithms": 92,
            "data structures": 85,
            "sql": 75,
            "linux": 80,
            "system design": 76,
        },
    },
    {
        "name": "Mia",
        "skills": {
            "javascript": 86,
            "angular": 84,
            "typescript": 80,
            "html": 87,
            "css": 89,
            "rxjs": 78,
        },
    },
    {
        "name": "Alexander",
        "skills": {
            "python": 90,
            "data analysis": 82,
            "sql": 85,
            "machine learning": 88,
            "excel": 80,
            "power bi": 70,
        },
    },
    {
        "name": "Harper",
        "skills": {
            "aws": 85,
            "docker": 80,
            "cloud computing": 74,
            "terraform": 78,
            "kubernetes": 70,
            "linux": 82,
        },
    },
    {
        "name": "Benjamin",
        "skills": {
            "java": 84,
            "spring boot": 86,
            "hibernate": 78,
            "sql": 80,
            "rest api": 83,
            "microservices": 77,
        },
    },
    {
        "name": "Evelyn",
        "skills": {
            "python": 90,
            "data science": 88,
            "tensorflow": 78,
            "r": 80,
            "machine learning": 85,
            "big data": 75,
        },
    },
    {
        "name": "Jack",
        "skills": {
            "c#": 87,
            ".net": 85,
            "azure": 82,
            "sql": 75,
            "javascript": 78,
            "mvc": 80,
        },
    },
    {
        "name": "Lily",
        "skills": {
            "aws": 85,
            "devops": 78,
            "kubernetes": 80,
            "terraform": 76,
            "docker": 82,
            "python": 75,
        },
    },
    {
        "name": "Sebastian",
        "skills": {
            "python": 85,
            "machine learning": 80,
            "sql": 82,
            "r": 70,
            "data wrangling": 74,
            "big data": 78,
        },
    },
    {
        "name": "Sofia",
        "skills": {
            "java": 87,
            "spring": 80,
            "hibernate": 76,
            "sql": 75,
            "cloud computing": 68,
            "kotlin": 80,
        },
    },
    {
        "name": "Logan",
        "skills": {
            "javascript": 80,
            "node.js": 78,
            "express": 75,
            "react": 82,
            "mongodb": 79,
            "html": 86,
        },
    },
    {
        "name": "Aria",
        "skills": {
            "python": 90,
            "machine learning": 88,
            "nlp": 78,
            "tensorflow": 72,
            "data analysis": 82,
            "r": 70,
        },
    },
    {
        "name": "Oliver",
        "skills": {
            "aws": 75,
            "devops": 85,
            "cloud computing": 80,
            "terraform": 78,
            "docker": 72,
            "python": 70,
        },
    },
    {
        "name": "Ava",
        "skills": {
            "data science": 84,
            "python": 80,
            "sql": 82,
            "r": 78,
            "machine learning": 90,
            "tableau": 70,
        },
    },
    {
        "name": "Levi",
        "skills": {
            "javascript": 82,
            "react": 85,
            "redux": 80,
            "node.js": 78,
            "html": 87,
            "css": 86,
        },
    },
    {
        "name": "Ella",
        "skills": {
            "cybersecurity": 88,
            "network security": 82,
            "firewalls": 75,
            "aws": 80,
            "penetration testing": 78,
        },
    },
    {
        "name": "Lucas",
        "skills": {
            "c++": 85,
            "algorithms": 88,
            "data structures": 80,
            "sql": 75,
            "linux": 72,
            "system design": 80,
        },
    },
    {
        "name": "Aurora",
        "skills": {
            "javascript": 84,
            "angular": 86,
            "typescript": 78,
            "html": 87,
            "css": 89,
        },
    },
    {
        "name": "Elena",
        "skills": {
            "aws": 85,
            "cloud computing": 78,
            "devops": 82,
            "terraform": 70,
            "docker": 80,
        },
    },
    {
        "name": "Caleb",
        "skills": {
            "python": 80,
            "data analysis": 88,
            "sql": 85,
            "excel": 82,
            "power bi": 78,
        },
    },
    {
        "name": "Lucy",
        "skills": {
            "java": 88,
            "spring": 82,
            "hibernate": 78,
            "sql": 70,
            "rest api": 84,
            "microservices": 76,
        },
    },
    {
        "name": "Samuel",
        "skills": {
            "javascript": 85,
            "vue.js": 78,
            "html": 87,
            "css": 82,
            "typescript": 74,
        },
    },
    {
        "name": "Gargi",
        "skills": {
            "aws": 68,
            "java": 80,
            "react": 77,
            "sql": 60,
            "html": 78,
            "css": 70,
            "javascript": 85,
        },
    },
    {
        "name": "Grace",
        "skills": {
            "python": 88,
            "machine learning": 90,
            "tensorflow": 75,
            "pytorch": 80,
        },
    },
    {
        "name": "Wyatt",
        "skills": {"c#": 85, ".net": 80, "sql": 70, "mvc": 74, "javascript": 82},
    },
    {
        "name": "Sunidha",
        "skills": {
            "aws": 68,
            "devops": 82,
            "kubernetes": 70,
            "terraform": 78,
            "docker": 80,
            "react": 79,
            "sql": 70,
            "html": 67,
            "css": 70,
        },
    },
    {
        "name": "Hazel",
        "skills": {
            "cybersecurity": 90,
            "network security": 80,
            "aws": 85,
            "python": 75,
        },
    },
    {
        "name": "Nathan",
        "skills": {"python": 85, "data science": 78, "r": 70, "sql": 85},
    },
    {
        "name": "Namma",
        "skills": {"python": 55, "UI": 78, "r": 70, "sql": 85},
    },
    {
        "name": "Kedar",
        "skills": {
            "aws": 78,
            "java": 82,
            "react": 75,
            "sql": 80,
            "html": 78,
            "css": 80,
            "javascript": 65,
        },
    },
    {
        "name": "Ramesh",
        "skills": {
            "aws": 68,
            "java": 72,
            "react": 79,
            "sql": 70,
            "html": 67,
            "css": 70,
        },
    },
    {
        "name": "Violet",
        "skills": {"javascript": 90, "react": 84, "css": 88, "redux": 82},
    },
    {
        "name": "Ethan",
        "skills": {"aws": 78, "devops": 85, "cloud computing": 75, "docker": 82},
    },
    {
        "name": "Zoey",
        "skills": {"data science": 85, "sql": 75, "r": 88, "machine learning": 90},
    },
    {"name": "Mateo", "skills": {"javascript": 84, "node.js": 75, "mongodb": 80}},
    {"name": "Nora", "skills": {"python": 92, "data analysis": 85, "r": 75}},
    {"name": "Isaac", "skills": {"aws": 78, "devops": 82, "docker": 75}},
]

students_df = pd.DataFrame(students_data)


def extract_text_from_pdf(pdf_file):
    """Extract text from a PDF file."""
    with pdfplumber.open(pdf_file) as pdf:
        text = "".join(page.extract_text() for page in pdf.pages if page.extract_text())
    return text


def extract_skills_from_text(text, skill_keywords):
    """Extract skills from the given text based on predefined keywords."""
    return [skill for skill in skill_keywords if skill in text.lower()]


@app.route("/recommend", methods=["POST"])
def recommend_students():
    """Recommend students based on skills extracted from a PDF with a 50-point threshold."""
    if "pdf" not in request.files:
        return jsonify({"error": "PDF file is required"}), 400

    pdf_file = request.files["pdf"]
    if pdf_file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    recommended_students = []

    pdf_text = extract_text_from_pdf(pdf_file)
    skill_keywords = [
        "python",
        "machine learning",
        "aws",
        "tensorflow",
        "java",
        "data analysis",
        "sql",
        "react",
        "javascript",
        "html",
        "css",
    ]
    job_skills = extract_skills_from_text(pdf_text, skill_keywords)

    skill_thresholds = {skill: 50 for skill in job_skills}

    sorted_recruiter_requirements = dict(
        sorted(skill_thresholds.items(), key=lambda item: -item[1])
    )

    def assign_priority_and_skill_score(student_skills, recruiter_skills):
        match_count = 0
        matched_skill_score = 0
        highest_priority = None

        for priority, (skill, req_score) in enumerate(
            recruiter_skills.items(), start=1
        ):
            student_score = student_skills.get(skill, 0)
            if student_score >= req_score:
                match_count += 1
                matched_skill_score += student_score
                if highest_priority is None or priority < highest_priority:
                    highest_priority = priority

        avg_skill_score = matched_skill_score / match_count if match_count > 0 else 0
        return highest_priority, avg_skill_score, match_count

    for student in students_data:
        highest_priority, avg_skill_score, match_count = (
            assign_priority_and_skill_score(
                student["skills"], sorted_recruiter_requirements
            )
        )

        if match_count > 0:
            custom_score = avg_skill_score
            student["Custom Score"] = custom_score
            student["Match Count"] = match_count
            student["Priority Score"] = highest_priority
            recommended_students.append(student)

    recommended_students = sorted(
        recommended_students,
        key=lambda x: (x["Match Count"], x["Priority Score"], x["Custom Score"]),
        reverse=True,
    )

    top_students = recommended_students[:3]

    return jsonify(
        {
            "students": recommended_students,
            "top_students": top_students,
            "extracted_skills": job_skills,
        }
    )


# @app.route("/recommend_with_thresholds", methods=["POST"])
# def recommend_with_thresholds():
#     """Recommend students based on skill thresholds provided in the request."""
#     data = request.get_json()
#     skill_thresholds = data.get("thresholds", {})

#     # Filter students based on provided thresholds
#     filtered_students = []
#     for student in students_data:
#         match = all(
#             student["skills"].get(skill, 0) >= threshold
#             for skill, threshold in skill_thresholds.items()
#         )
#         if match:
#             custom_score = sum(student["skills"].values())
#             student["Custom Score"] = custom_score
#             filtered_students.append(student)

#     top_students = sorted(
#         filtered_students, key=lambda x: x["Custom Score"], reverse=True
#     )[:3]
#     return jsonify({"students": top_students})


@app.route("/get_skills", methods=["GET"])
def get_skills():
    return jsonify(
        {
            "skills": [
                "python",
                "machine learning",
                "aws",
                "tensorflow",
                "java",
                "data analysis",
                "sql",
                "react",
                "javascript",
                "html",
                "css",
            ]
        }
    )


@app.route("/recommend_with_thresholds", methods=["POST"])
def recommend_with_thresholds():
    """Recommend students based on skill thresholds provided in the request."""
    data = request.get_json()
    skill_thresholds = data.get("thresholds", {})
    recruiter_requirements = data.get("thresholds", {})
    print("Recruiter Requirements:", skill_thresholds)

    sorted_recruiter_requirements = dict(
        sorted(recruiter_requirements.items(), key=lambda item: -item[1])
    )

    def assign_priority_and_skill_score(student_skills, recruiter_skills):
        match_count = 0
        matched_skill_score = 0
        highest_priority = None

        for priority, (skill, req_score) in enumerate(
            recruiter_skills.items(), start=1
        ):
            student_score = student_skills.get(skill, 0)
            if student_score >= req_score:
                match_count += 1
                matched_skill_score += student_score
                if highest_priority is None or priority < highest_priority:
                    highest_priority = priority

        avg_skill_score = matched_skill_score / match_count if match_count > 0 else 0
        return highest_priority, avg_skill_score, match_count

    students_df[["Priority Score", "Average Skill Score", "Match Count"]] = students_df[
        "skills"
    ].apply(
        lambda x: pd.Series(
            assign_priority_and_skill_score(x, sorted_recruiter_requirements)
        )
    )

    recruiter_requirements_recommended_students = students_df[
        students_df["Match Count"] > 0
    ]

    recruiter_requirements_recommended_students = (
        recruiter_requirements_recommended_students.sort_values(
            by=["Match Count", "Priority Score", "Average Skill Score"],
            ascending=[False, True, False],
        ).reset_index(drop=True)
    )

    filtered_students = []
    for student in recruiter_requirements_recommended_students.to_dict(
        orient="records"
    ):
        match = all(
            student["skills"].get(skill, 0) >= threshold
            for skill, threshold in skill_thresholds.items()
        )
        if match:
            custom_score = sum(
                score
                for skill, score in student["skills"].items()
                if skill in skill_thresholds
            ) / len(skill_thresholds)
            student["Custom Score"] = custom_score
            filtered_students.append(student)

    top_students = sorted(
        filtered_students, key=lambda x: x["Custom Score"], reverse=True
    )[:3]

    return jsonify(
        {
            "students": [
                {**student, "Match Count": student["Match Count"]}
                for student in recruiter_requirements_recommended_students.to_dict(
                    orient="records"
                )
            ],
            "top_students": top_students,
            "total_students": len(students_data),
        }
    )


if __name__ == "__main__":
    os.makedirs("uploads", exist_ok=True)
    app.run(debug=True)
