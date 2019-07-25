function bg_canvas() {
  if (document.querySelector('.bg_canvas--js')) {
    const canvas = document.querySelector('.bg_canvas--js');

    if (canvas.getContext) {

      // scripts bg canvas

      // параметры
      const OPTS = {
        particle_color: ["rgba(204, 204, 239, 0.4)", "rgba(247, 213, 217, 0.4)", "rgba(255, 255, 255, 0.4)", "rgba(245, 249, 192, 0.4)", "rgba(241, 249, 139, 0.4)", "rgba(249, 201, 196, 0.4)", "rgba(196, 247, 249, 0.4)", "rgba(167, 248, 251, 0.4)", "rgba(249, 196, 242, 0.4)", "rgba(216, 249, 196, 0.4)"],
        default_speed: 0.02,
        variant_speed: 0.02,
        default_radius: 0.6,
        variant_radius: 0.001
      }

      // отрисовка точки
      Particle = function (x_pos, y_pos) {
        // получаем рандомные точки координат
        this.x = Math.random() * w;
        this.y = (Math.random() * (h - 50));
        // скорость анимации точки
        this.speed = OPTS.default_speed + Math.random() * OPTS.variant_speed;
        // для более разлиного вектора изменения радиуса
        this.direction_angle = Math.floor(Math.random() * 360);
        // цвет точки
        this.color = OPTS.particle_color[Math.ceil(Math.random() * 10)];
        // рандомный радиус точки
        this.radius = OPTS.default_radius + Math.random() * OPTS.variant_radius;
        // на сколько изменяется радиус точки 
        this.vector = {
          radius: Math.sin(this.direction_angle) * this.speed
        }
        // обновление радиуса
        this.update = function () {
          // ограничиваем радиус
          this.border();
          // // обновление радиуса
          this.radius += this.vector.radius;
        }
        // ограничение радиуса
        this.border = function () {
          // если точка больше/меньше нужного - меняем направление изменения радиуса
          if (this.radius >= 1.5 || this.radius <= 0.5) {
            this.vector.radius *= -1;
          }
        }
        // отрисовка точки
        this.draw = function () {
          // начало отрисовки
          ctx.beginPath();
          // отрисовка круга
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          // окончание отрисовки, чтобы точки не соединялись
          ctx.closePath();
          // определяем цвет заливки
          ctx.fillStyle = this.color;
          // определяем цвет свечения
          ctx.shadowColor = this.color;
          // определяем смещение свечения
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          // разме4 свечения
          ctx.shadowBlur = 5;
          // заливаем точку
          ctx.fill();

        }
      }

      // функция получения размера окна и инициализации размера холста
      var resizeReset = function () {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
      }

      // после изменения размера окна переопределяем размеры холста 
      // что бы точки всегда были в пределах холста
      var delay = 200;
      var tid;

      // отслеживаем изменение размеров окна
      window.addEventListener("resize", function () {
        deBounser();
      })
      // после того как событие изменения размераокна закончилось 
      // вызываем функцию отпределения размеров холста
      var deBounser = function () {
        clearTimeout(tid);
        tid = setTimeout(function () {
          resizeReset();
          setup();
        }, delay)
      }

      function setup() {
        // создаем массив точек
        particles = [];
        // задаем ширину
        resizeReset();
        // в цикле создаем звезды из расчета одна площадь 95х95
        // не сильно много всегда и не сильно мало
        for (var i = 0; i < Math.ceil(w / 195 * h / 195); i++) {
          particles.push(new Particle());
        }
        window.requestAnimationFrame(loop);
      }

      function loop() {
        window.requestAnimationFrame(loop);
        // очищаем холст перед отрисовкой нового изображения
        ctx.clearRect(0, 0, w, h);
        // для каждой точки
        for (var i = 0; i < particles.length; i++) {
          // обновляем координаты
          particles[i].update();
          // отрисовка с новыми координатами
          particles[i].draw();
          ctx.beginPath();

        }
      }

      // передаем контекст
      ctx = canvas.getContext("2d");
      // запуск скрипта
      setup();
      // \scripts bg canvas

    } else {
      alert("нет поддержки canvas в вашем браузере");
    }
  }
}