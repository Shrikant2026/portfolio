export interface Skill {
  name: string;
  icon: string;
  production: boolean;
}

export const skills: Skill[] = [
  { name: "PHP", icon: "devicon-php-plain", production: true },
  { name: "CodeIgniter 4", icon: "devicon-codeigniter-plain", production: true },
  { name: "MySQL", icon: "devicon-mysql-plain", production: true },
  { name: "Redis", icon: "devicon-redis-plain", production: true },
  { name: "Node.js", icon: "devicon-nodejs-plain", production: true },
  { name: "Socket.IO", icon: "devicon-socketio-original", production: true },
  { name: "JavaScript", icon: "devicon-javascript-plain", production: true },
  { name: "jQuery", icon: "devicon-jquery-plain", production: true },
  { name: "Nginx", icon: "devicon-nginx-original", production: true },
  { name: "Apache", icon: "devicon-apache-plain", production: true },
  { name: "Git & GitHub", icon: "devicon-git-plain", production: true },
  { name: "Postman", icon: "devicon-postman-plain", production: true },
  { name: "Cron Jobs", icon: "devicon-linux-plain", production: true },
  { name: "Docker", icon: "devicon-docker-plain", production: true }
];
