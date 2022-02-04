# Pin npm packages by running ./bin/importmap

pin "application", preload: true
pin "@hotwired/turbo-rails", to: "turbo.min.js", preload: true
pin "@hotwired/stimulus", to: "https://ga.jspm.io/npm:@hotwired/stimulus@3.0.1/dist/stimulus.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js", preload: true
pin_all_from "app/javascript/controllers", under: "controllers"
# pin "vue", to: "https://ga.jspm.io/npm:vue@3.2.29/dist/vue.runtime.esm-bundler.js"
# pin "@vue/reactivity", to: "https://ga.jspm.io/npm:@vue/reactivity@3.2.29/dist/reactivity.esm-bundler.js"
# pin "@vue/runtime-core", to: "https://ga.jspm.io/npm:@vue/runtime-core@3.2.29/dist/runtime-core.esm-bundler.js"
# pin "@vue/runtime-dom", to: "https://ga.jspm.io/npm:@vue/runtime-dom@3.2.29/dist/runtime-dom.esm-bundler.js"
# pin "@vue/shared", to: "https://ga.jspm.io/npm:@vue/shared@3.2.29/dist/shared.esm-bundler.js"
pin "stimulus_reflex", to: "https://ga.jspm.io/npm:stimulus_reflex@3.5.0-pre8/javascript/stimulus_reflex.js"
pin "@rails/actioncable", to: "https://ga.jspm.io/npm:@rails/actioncable@7.0.1/app/assets/javascripts/actioncable.esm.js"
pin "cable_ready", to: "https://ga.jspm.io/npm:cable_ready@5.0.0-pre8/javascript/index.js"
pin "morphdom", to: "https://ga.jspm.io/npm:morphdom@2.6.1/dist/morphdom.js"
pin "stimulus", to: "https://ga.jspm.io/npm:stimulus@3.0.1/dist/stimulus.js"
