function bg_canvas() {
  if (document.querySelector('.bg_canvas--js')) {
    const canvas = document.querySelector('.bg_canvas--js');

    if (canvas.getContext) {

      // scripts bg canvas

      // параметры
      const OPTS = {
        particle_color: "rgb(200, 200, 200)",
        line_color: ["#ffffff", "#ccccef", "#f7d5d9", "#f5f9c0", "#f1f98b", "#f9c9c4", "#c4f7f9", "#a7f8fb", "#f9c4f2", "#d8f9c4"],
        default_speed: 0.02,
        variant_speed: 0.02,
        default_radius: 1,
        variant_radius: 0.1,
        link_radius: 2000
      }

      // отрисовка точки
      Particle = function (x_pos, y_pos) {
        // получаем рандомные точки координат
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        // скорость анимации точки
        this.speed = OPTS.default_speed + Math.random() * OPTS.variant_speed;
        // 
        this.direction_angle = Math.floor(Math.random() * 360);
        // цвет точки
        // this.color = OPTS.particle_color;
        this.color = OPTS.line_color[Math.ceil(Math.random() * 10)];
        // рандомный радиус точки
        this.radius = OPTS.default_radius + Math.random() * OPTS.variant_radius;
        // изменение координат по синусу и косинусу
        this.vector = {
          radius: Math.abs(Math.sin(this.direction_angle) * this.speed)
        }
        // обновление координат точки
        this.update = function () {
          // ограничиваем радиус
          this.border();
          // // обновление радиуса
          this.radius += this.vector.radius;
        }
        // ограничение радиуса
        this.border = function () {
          // если точка больше/меньше нужного - меняем направление изменения радиуса
          if (this.radius >= 2 || this.radius <= 1) {
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
        // в цикле создаем звезды из расчета одна площадь 90х90
        // не сильно много всегда и не сильно мало
        for (var i = 0; i < Math.ceil(w / 90 * h / 90); i++) {
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
        }
      }

      // передаем контекст
      ctx = canvas.getContext("2d");
      // запуск скрипта
      setup();
      // \scripts bg canvas

    } else {
      alert("нет поддержки canvas");
    }
  }
}