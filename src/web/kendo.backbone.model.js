// Kendo-Backbone Model
// --------------------
// 
// Wrap a Backbone.Model in a kendo.data.Model
(function () {
  var Model = kendo.data.Model;

  function wrapBackboneModel(BackboneModel, fields) {
    return Model.define({
      fields: fields,
      init: function(model) {
        if (!(model instanceof BackboneModel)) {
          model = new BackboneModel(model);
        }

        this.idField = model.idAttribute;
        Model.fn.init.call(this, model.toJSON());
        this._backbone = model;
      },
      set: function(field, value) {
        Model.fn.set.call(this, field, value);

        this._backbone.set(field, value);
      }
    });
  }

  kendo.backboneModel = wrapBackboneModel;
})();
