# Use the official Nginx image
FROM nginx:alpine

# Copy the HTML and CSS files to the Nginx web root
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Expose port 80
EXPOSE 9000