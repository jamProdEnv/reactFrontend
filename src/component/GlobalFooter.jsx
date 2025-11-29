import classes from "../CSS/GlobalFooter.module.css";
export function GlobalFooter() {
  return (
    <>
      <footer className={classes.footerContainer}>
        <h3>Portfolio</h3>
        <section className={classes.footerSection}>
          <div className={classes.footerDescription}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime
              nesciunt facere non, eveniet debitis fugit nisi vel vitae voluptas
              totam, neque reprehenderit id optio molestias quis iusto eaque
              velit animi.
            </p>
          </div>

          <div className={classes.footerLinks}>
            <div className={classes.footerDiv}>
              <ul>
                <h3>#######</h3>
                <li>#</li>
                <li>#</li>
                <li>#</li>
                <li>#</li>
                <li>#</li>
              </ul>
            </div>

            <div className={classes.footerDiv}>
              <h3>#######</h3>
              <ul>
                <li>#</li>
                <li>#</li>
                <li>#</li>
                <li>#</li>
                <li>#</li>
              </ul>
            </div>

            <div className={classes.footerDiv}>
              <h3>#######</h3>
              <ul>
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
