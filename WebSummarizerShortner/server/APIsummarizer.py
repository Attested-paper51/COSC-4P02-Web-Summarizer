import uuid

def generate_api_key():
    return uuid.uuid4().hex  # Generates a random UUID and converts it to a hex string

# Assume this is part of your user registration or upgrade process
user = User.query.filter_by(id=user_id).first()
if user and not user.api_key:
    user.api_key = generate_api_key()
    db.session.commit()
