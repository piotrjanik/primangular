# -*- mode: ruby -*-
# vi: set ft=ruby :

# Instrukcja uruchomienia maszyny wirtualnej. Wszystkie polecenia wykonywać z bash (git-bash pod Windows) 
# 1. Instalacja vagrant
# 2. instalacja wtyczki vagrant-hostsupdater (opcjonalna):
#     vagrant plugin install vagrant-hostsupdater
# 3. Uruchomienie maszyny (pierwsze uruchomienie ~30min):
#     vagrant up
#
#   - logowanie do maszyny wirtualnej: vagrant ssh
#   - katalog projektu jest podlinkowany w ~/energy (/home/vagrant/energy)
#   - budowanie projektu: 
#       vagrant ssh
#       cd energy
#       mvn install

ansible_found = system('ansible --version');

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"

   config.vm.network "forwarded_port", guest: 9000, host: 9000

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  config.vm.hostname = 'vagrant-energy'
  
  config.vm.network :private_network, ip: "192.168.33.10"
  config.vm.hostname = "vagrant-energy"

  # aktualizuje plik /etc/hosts hosta (nie VM), aby poniższe nazwy wskazywały na IP maszyny wirtualnej. 
  # Wpisy są dodawane przy starcie maszyny, usuwane przy jej zatrzymywaniu.
  # wymaga wtyczki vagrant-hostsupdater (vagrant plugin install vagrant-hostsupdater) 
  
  if defined? VagrantPlugins::HostsUpdater
    config.hostsupdater.aliases = ["dobrataryfa", "deltis", "demo"]
  end

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"

  config.vm.provider "virtualbox" do |vb|
    # Customize the amount of memory on the VM:
    vb.memory = "1024"
  end
  
  if !ansible_found
    # provisioning przez ansible instalowany w gościu, nie wymaga ansible na hoście 
    config.vm.provision 'ansible_setup', type: 'shell', path: 'provision/ansible_setup.sh' 
  else
    # provisioning przez ansible instalowany na hoście
    config.vm.provision 'ansible' do |ansible|
      ansible.playbook = 'provision/vagrant.yml'
      ansible.verbose = 'v'
    end
  end
  
  config.ssh.forward_agent = true
  
end
