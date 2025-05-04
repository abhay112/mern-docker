# 🧩 Full-Stack CRUD Assignment with Docker + Kubernetes

This is a full-stack CRUD application with the following tech stack:

- **Frontend**: Next.js + TypeScript + Tailwind CSS
- **Backend**: Express.js + TypeScript + MongoDB
- **Containerization**: Docker
- **Orchestration**: Kubernetes (k8s)

---

## 📁 Project Structure


---

## 🚀 Getting Started (For Beginners)

If you don't have Docker or Kubernetes setup — follow the steps below.

---

## 🔧 Prerequisites

Install the following:

### 1. Docker
- Install: [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)


### 2. Minikube (Kubernetes locally)
- Install: [https://minikube.sigs.k8s.io/docs/start/](https://minikube.sigs.k8s.io/docs/start/)
- OR use the `minikube-linux-amd64` binary (already included in project)


### 3. Kubectl
- Install: [https://kubernetes.io/docs/tasks/tools/](https://kubernetes.io/docs/tasks/tools/)

---

## 🐳 Option 1: Run Using Docker Compose (Without Kubernetes)


Step 1: Start Minikube
minikube start

#If needed, restart cleanly:
minikube stop
minikube delete
minikube start


#run this before running minikube
#Step 2: Enable Docker to use Minikube’s Docker daemon
eval $(minikube docker-env)

#Step 3: Build Docker Images for Kubernetes
docker build -t frontend:local ./app/frontend
docker build -t backend:local ./app/backend

#Step 4: Apply Kubernetes Manifests
kubectl delete -f k8s/ #it will delete all 
kubectl apply -f k8s/  #reapply all


#Step 6: Check Status
kubectl get pods  #check status
kubectl get services

http://localhost:3000/

