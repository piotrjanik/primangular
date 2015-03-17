# vi: set ft=ruby :

ansible_found = system('ansible --version');

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"

   config.vm.network "forwarded_port", guest: 9000, host: 9999

  config.vm.hostname = 'primangular'
  
  config.vm.network :private_network, ip: "192.168.33.10"
  config.vm.hostname = "primangular"


  config.vm.provider "virtualbox" do |vb|
    vb.memory = "1024"
  end
  
  if !ansible_found
    config.vm.provision 'ansible_setup', type: 'shell', path: 'provision/ansible_setup.sh'
  else
    config.vm.provision 'ansible' do |ansible|
      ansible.playbook = 'provision/vagrant.yml'
      ansible.verbose = 'v'
    end
  end
  
  config.ssh.forward_agent = true
  
end
