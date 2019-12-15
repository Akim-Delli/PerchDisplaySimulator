// Configure the Google Cloud provider
provider "google" {
  credentials = file("CREDENTIALS_FILE.json")
  project     = "perchdisplaysimulator"
  region      = var.region
}

resource "random_id" "instance_id" {
  byte_length = 8
}

resource "google_compute_instance" "default" {
  name         = "perchinteractive-vm-${random_id.instance_id.hex}"
  machine_type = "f1-micro"
  zone         = "us-east1-b"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-9"
    }
  }

  metadata_startup_script = "sudo apt-get update; sudo apt-get install -yq build-essential python-pip rsync;git clone https://github.com/Akim-Delli/PerchDisplaySimulator.git; pip install -r requirements.txt"

  network_interface {
    network = "default"

    access_config {
      // Include this section to give the VM an external ip address
    }
  }

  metadata = {
    ssh-keys = "akim:${file("~/.ssh/id_rsa.pub")}"
  }
}

// A variable for extracting the external ip of the instance
output "ip" {
  value = google_compute_instance.default.network_interface[0].access_config[0].nat_ip
}

resource "google_compute_firewall" "default" {
  name    = "perchsimulator-app-firewall"
  network = "default"

  allow {
    protocol = "tcp"
    ports = [
    "8000"]
  }
}

resource "google_sql_database_instance" "postgresql" {
  name             = "master-instance"
  database_version = var.postgresql_version
  region           = var.region

  settings {
    tier = "db-f1-micro"
  }
}

# create database
resource "google_sql_database" "postgresql_db" {
  name     = "perchsimulator"
  instance = google_sql_database_instance.postgresql.name
}

resource "google_sql_user" "postgresql_user" {
  name     = "percher"
  instance = google_sql_database_instance.postgresql.name
  host     = "%"
  password = "var.db_password"
}
