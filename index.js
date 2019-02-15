// play this: https://www.youtube.com/watch?v=d-diB65scQU

// code away!
const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");

const port = 4000;

const actionDb = require("./data/helpers/actionModel.js");
const projectDb = require("./data/helpers/projectModel.js");

const server = express();
server.use(logger("dev"), helmet(), express.json());
// adding this for git hub purposes


server.get("/api/projects", (req, res) => {
  projectDb
    .get()
    .then(project => {
      res.json(project);
    })
    .catch(err =>
      res.status(500).json({
        error: "Unable to Retrieve Projects."
      })
    );
});


server.get("/api/projects/:id", (req, res) => {
    const { id } = req.params;
    projectDb
    .get(id)
      .then(project => {
        if (project) {
          res.json(project);
        } else {
          res.status(404).json({ message: "The project Can Not be Found." });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "Server Error. The project can not be found." });
      });
  });
  
  server.get("/api/projects/actions/:id", (req, res) => {
    const { id } = req.params;
  
    projectSb
    .get(id)
      .then(project => {
        if (project) {
          projectDb
          .getProjectActions(id).then(actions => {
            res.json(actions);
          });
        } else {
          res.status(404).json({ message: "The project Can Not be Found." });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "Server Error. The project can not be found." });
      });
  });

  server.post("/api/projects", (req, res) => {
    const { name, description } = req.body;
  
    if (!name || !description) {
      res.status(422).json({ message: "A project Name and Description are Required" });
    } else {
      projectDb
      .insert({ name, description })
        .then(result => {
          if (result) {
            projectDb
            .get().then(projects => {
              res.json(projects);
            });
          }
        })
        .catch((err) => res.status(500).json({ message: "Server Error" }));
    }
  });
  

  server.put("/api/projects/:id", (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
  
    if (!name || !description) {
      res.status(422).json({ message: "A project Name and Description are Required" });
    } else {
      projectDb
      .get(id)
        .then(project => {
          if (project) {
            projectDb
            .update(id, { name, description }).then(result => {
              if (result) {
                projectDb
                .get().then(projects => {
                  res.json(projects);
                });
              } else {
                res.status(404).json({ message: "Project Could Not be Found." });
              }
            });
          } else {
            res.status(404).json({ message: "Project Could Not be Found." });
          }
        })
        .catch(() => res.status(500).json({ message: "Server Error. Project Could Not be Found." }));
    }
  });

  server.delete("/api/projects/:id", (req, res) => {
    const { id } = req.params;
  
    projectDb
    .remove(id)
      .then(result => {
        if (result) {
          projectDb
          .get().then(projects => res.json(projects));
        } else {
          res.status(500).json({ message: "Project Could not be Deleted." });
        }
      })
      .catch(() => res.status(500).json({ message: "Server Error. Project Could not be Deleted." }));
  });



// Originally all of the above was in a separate file from the Action Endpoints. But I was having problems, so I am combining
// everything into one file. Later, I will fix this. For now Action endpoints follow:


server.get("/api/actions", (req, res) => {
  actionDb
    .get()
    .then(action => {
      res.json(action);
    })
    .catch(err =>
      res.status(500).json({
        error: "Actions Could Not be Retrieved."
      })
    );
});

server.post("/api/actions/:id", (req, res) => {
    const { id } = req.params;
    const { description, notes, project_id} = req.body;
  
    if (!description || !notes || !project_id) {
      res.status(422).json({ message: "You need to Include a Description, Notes and Project Id." });
    } else {
      projectDb
      .get(id)
        .then(project => {
          if (project) {
            actionDb
            .insert({ description, notes, project_id: id })
              .then(result => {
                res.json(result);
              })
              .catch((err) =>
                res.status(500).json({ message: "Server Error. Action could not be Added." })
              );
          } else {
            res.status(404).json({ message: "Project Could Not be Found." });
          }
        })
        .catch((err) => res.status(500).json({ message: "Server Error. Action could not be Added." }));
    }
  });

  server.put("/api/actions/:id", (req, res) => {
    const { id } = req.params;
    const { notes, description, project_id } = req.body;
    if (!description || !notes || !project_id) {
      res.status(422).json({ message: "You need to Include a Description, Notes and Project Id." });
    } else {
      actionDb
      .update(id, { notes, description })
        .then(result => {
          if (result) {
            actionDb
            .get().then(actions => {
              res.json(actions);
            });
          } else {
            res.status(404).json({ message: "Unable to Update Action." });
          }
        })
        .catch((err) => {
          res.status(500).json({ message: "Server Error. Unable to Update Action." });
        });
    }
  });


server.delete("/api/actions/:id", (req, res) => {
  const { id } = req.params;
  actionDb
    .remove(id)
    .then(action => {
      if (!action) {
        res.status(404).json({
          message: "The action with that specified ID can not be found."
        });
      } else {
        res.status(200).json({ action, message: "Action has been deleted." });
      }
    })
    .catch(err =>
      res.status(500).json({
        error: "Server Error . The action could not be deleted."
      })
    );
});



server.listen(port, () => {
  console.log(`\n === API running on port ${port} ===\n`);
});

