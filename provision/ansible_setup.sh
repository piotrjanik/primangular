#!/usr/bin/env bash
set -x

export DEBIAN_FRONTEND=noninteractive

if [[ ! -e /etc/apt/sources.list.d/ansible-ansible-trusty.list ]]; then
  sudo apt-add-repository -y ppa:ansible/ansible;
  sudo apt-get update;
fi

sudo apt-get -qy install ansible;

# W przypadku, gdy hostem jest Windows, pliki w katalogu /vagrant 
# (montowane przez shared folders VBox'a) mają uprawnienia 777, 
# a ansible ma problem z użyciem pliku hosts z uprawnieniem execute

LOCAL_ANSIBLE_HOSTS=/home/vagrant/.ansible_hosts

cp -f /vagrant/provision/ansible_hosts $LOCAL_ANSIBLE_HOSTS
chmod 600 $LOCAL_ANSIBLE_HOSTS

cd /vagrant/provision
export ANSIBLE_HOST_KEY_CHECKING=False
ansible-playbook -i $LOCAL_ANSIBLE_HOSTS vagrant.yml -v