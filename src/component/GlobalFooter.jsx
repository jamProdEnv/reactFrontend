import classes from "../CSS/GlobalFooter.module.css";
export function GlobalFooter() {
  return (
    <>
      <footer className={classes.container}>
        <h3>Portfolio</h3>

        <section>
          <div className={classes.div1}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime
              nesciunt facere non, eveniet debitis fugit nisi vel vitae voluptas
              totam, neque reprehenderit id optio molestias quis iusto eaque
              velit animi.
            </p>
          </div>

          <div className={classes.div2}>
            <div className={classes.footerDiv}>
              <h3>#######</h3>
              <ul className={classes.links}>
                <li>#</li>
                <li>#</li>
                <li>#</li>
                <li>#</li>
                <li>#</li>
              </ul>
            </div>

            <div className={classes.footerDiv}>
              <h3>#######</h3>
              <ul className={classes.links}>
                <li>#</li>
                <li>#</li>
                <li>#</li>
                <li>#</li>
                <li>#</li>
              </ul>
            </div>

            <div className={classes.footerDiv}>
              <h3>#######</h3>
              <ul className={classes.links}>
                <li>#</li>
                <li>#</li>
                <li>#</li>
                <li>#</li>
                <li>#</li>
              </ul>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
}
