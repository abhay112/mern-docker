docker-compose up --build
docker stop ae0dfd91cc87 10648febda1c 57c1294452ee  stop container
docker rm ae0dfd91cc87 10648febda1c 57c1294452ee  removed stopped container

docker rmi 356d54840c8c ab33e5cf9674 f6a661f83eee       Now remove the images:
 
docker stop $(docker ps -q)  stop all running container
docker rm -f $(docker ps -a -q)  rmove all stop running container



Point Docker CLI to Minikube’s Docker daemon:

eval $(minikube docker-env)

----

kubernatese

#
minikube stop
minikube delete
minikube start


kubectl apply -f k8s/mongo.yaml
kubectl apply -f k8s/backend.yaml
kubectl apply -f k8s/frontend.yaml
kubectl apply -f k8s/ingress.yaml




1. Verify the Resources
Check if all the Pods, Services, and Ingress have been created successfully:

kubectl get pods
kubectl get services
kubectl get ingress



3. Port Forward for Local Access
If you want to access your frontend service locally (on your machine), you can port-forward the frontend service to a local port:

kubectl port-forward service/frontend 8080:80


run this before running minikube
eval $(minikube docker-env)


docker build -t frontend:local ./app/frontend
docker build -t backend:local ./app/backend

kubectl delete -f k8s/ #it will delete all 
kubectl apply -f k8s/  #reapply all


kubectl apply -f k8s/mongo.yaml
kubectl apply -f k8s/backend.yaml
kubectl apply -f k8s/frontend.yaml
kubectl apply -f k8s/ingress.yaml


kubectl get pods  #check status

minikube service frontend --url

    <!-- http://localhost:3000/

http://192.168.58.2:30080/ -->