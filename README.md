✅ This setup works specifically on Ubuntu and assumes you're using Minikube and Docker locally.

# 🧩 Full-Stack CRUD Assignment with Docker + Kubernetes

This is a full-stack CRUD application with the following tech stack:

- **Frontend**: Next.js + TypeScript + Tailwind CSS
- **Backend**: Express.js + TypeScript + MongoDB
- **Containerization**: Docker
- **Orchestration**: Kubernetes (k8s)

---

## 📁 Project Structure
app/
├── frontend/      # Next.js App
├── backend/       # Express API
k8s/
├── mongo.yaml     # MongoDB Deployment & Service
├── backend.yaml   # Backend Deployment & Service
├── frontend.yaml  # Frontend Deployment & Service


---

### 🚀 Getting Started (For Beginners)

If you don't have Docker or Kubernetes setup — follow the steps below.

---

#### 🔧 Prerequisites

Install the following:

##### 1. Docker
- Install: [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)


###### 2. Minikube (Kubernetes locally)
- Install: [https://minikube.sigs.k8s.io/docs/start/](https://minikube.sigs.k8s.io/docs/start/)
- OR use the `minikube-linux-amd64` binary (already included in project)


###### 3. Kubectl
- Install: [https://kubernetes.io/docs/tasks/tools/](https://kubernetes.io/docs/tasks/tools/)

---

####### 🐳 Option 1: Run Using Docker Compose (Without Kubernetes)





# Step 1: Start Minikube
minikube start

#If needed, restart cleanly:
minikube stop
minikube delete
minikube start


## Step 2: Enable Docker to use Minikube’s Docker daemon

eval $(minikube docker-env)



### Step 3: Configure Environment Variables
    Before proceeding with Docker image builds, you need to set the appropriate environment variables, especially the NEXT_PUBLIC_API_URL.


    1.Fetch Minikube IP:

    Get the Minikube IP address which will be used to configure the frontend’s API URL:
    $ minikube ip


    2. Set the Environment Variables for Frontend:

    Update the .env file in the frontend folder (./app/frontend/.env) to include the Minikube IP address in NEXT_PUBLIC_API_URL:
    NEXT_PUBLIC_API_URL=http://<minikube-ip>:30001
    Replace <minikube-ip> with the IP address retrieved from the minikube ip command (e.g., 192.168.58.2).



    3. Update Dockerfile for Frontend:

    If your frontend/Dockerfile includes the NEXT_PUBLIC_API_URL, make sure to replace the hardcoded IP address with the one obtained from minikube ip.

    Example (inside frontend/Dockerfile):
    ENV NEXT_PUBLIC_API_URL=http://<minikube-ip>:30001



#### Step 4: Build Docker Images for Kubernetes

docker build -t frontend:local ./app/frontend
docker build -t backend:local ./app/backend

##### Step 5: Apply Kubernetes Manifests
<!-- kubectl delete -f k8s/ #it will delete all 
kubectl apply -f k8s/  #reapply all -->

kubectl apply -f k8s/mongo.yaml
kubectl apply -f k8s/backend.yaml
kubectl apply -f k8s/frontend.yaml



###### Step 6: Check Status
kubectl get pods  
kubectl get services

kubectl delete pods --all

###### Step 7: Get Url
minikube service frontend --url



