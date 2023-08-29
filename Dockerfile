# Use an official Python runtime as the base image
FROM python:3.9

# Set the working directory in the container
WORKDIR /drops

# Copy the requirements file into the container
COPY requirements.txt /drops/

# Install the required dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the Django app code to the container
COPY . /drops/

# Run the collectstatic command
RUN python manage.py collectstatic --noinput

# Expose the port on which the Django app will run
EXPOSE 8000

# Define the command to run the Django app
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]