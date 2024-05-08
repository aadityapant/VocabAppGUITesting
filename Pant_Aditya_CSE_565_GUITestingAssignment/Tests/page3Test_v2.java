import org.openqa.selenium.By;
import org.openqa.selenium.Point;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
public class page3Test_v2 {
    public static void main(String[] args) {
      System.setProperty("webdriver.chrome.driver", "C:\\Users\\aditp\\Documents\\lib\\selenium\\chromedriver-win64\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        driver.get("http://127.0.0.1:5500/version_2/index.html");
        driver.manage().window().maximize();

        int maxIterations = 21;
        int iteration = 0;
        boolean reachedResultPage = false;
        while (iteration < maxIterations && !reachedResultPage) {
            // Click the button
            WebElement button = driver.findElement(By.className("average-button"));
            button.click();

            if (driver.getTitle().equals("Assignment 5:GUI Testing:Result")) {
                reachedResultPage = true;
            }

            // Increment the iteration counter
            iteration++;
        }

        // Check if the result page is reached or not
        if (reachedResultPage) {
            // System.out.println("PASSED: Reached the result page.");
            WebElement image = driver.findElement(By.className("word-logo"));
            if (image.isDisplayed()) {
                System.out.println("PASSED: Image exists on the result page.");
            } else {
                System.out.println("FAILED: Image does not exist on the result page.");
            }

            // Check if the slider exists
            WebElement slider = driver.findElement(By.id("rating-input"));
            if (slider.isDisplayed()) {
                System.out.println("PASSED: Slider exists on the result page.");
            } else {
                System.out.println("FAILED: Slider does not exist on the result page.");
            }

            // Check if the checkbox exists
            WebElement checkbox = driver.findElement(By.className("preference"));
            if (checkbox.isDisplayed()) {
                System.out.println("PASSED: Checkbox exists on the result page.");
            } else {
                System.out.println("FAILED: Checkbox does not exist on the result page.");
            }

            // Check if the button exists
            WebElement resultButton = driver.findElement(By.className("average-button"));
            if (resultButton.isDisplayed()) {
                System.out.println("PASSED: Button exists on the result page.");
            } else {
                System.out.println("FAILED: Button does not exist on the result page.");
            }

            // --------------------------------------------
            // ----------Check Relative Pos----------------
            // --------------------------------------------
            // Check if the slider is below the checkbox
          boolean isSliderBelowCheckbox = isBelow(checkbox, slider);
          if (isSliderBelowCheckbox) {
              System.out.println("PASSED: Slider is below the checkbox.");
          } else {
              System.out.println("FAILED: Slider is not below the checkbox.");
          }

          // Check if the button is below the slider
          boolean isButtonBelowSlider = isBelow(slider, resultButton);
          if (isButtonBelowSlider) {
              System.out.println("PASSED: Button is below the slider.");
          } else {
              System.out.println("FAILED: Button is not below the slider.");
          }

          // --------------------------------------
          // -------Text Content Checking----------
          // --------------------------------------

          WebElement checkboxLabel = driver.findElement(By.id("checkbox-label"));

          // Locate the slider label
          WebElement sliderLabel = driver.findElement(By.id("slider-ka-label"));
          // Check the content of the checkbox label
        String expectedCheckboxLabelText = "Would you recommend this quiz to your friend?";
        String actualCheckboxLabelText = checkboxLabel.getText();
        if (actualCheckboxLabelText.equals(expectedCheckboxLabelText)) {
            System.out.println("PASSED: Content of Checkbox Label is correct.");
        } else {
            System.out.println("FAILED: Content of Checkbox Label is incorrect.");
        }

        // Check the content of the slider label
        String expectedSliderLabelText = "Rate this quiz (1-10):";
        String actualSliderLabelText = sliderLabel.getText();
        if (actualSliderLabelText.equals(expectedSliderLabelText)) {
            System.out.println("PASSED: Content of Slider Label is correct.");
        } else {
            System.out.println("FAILED: Content of Slider Label is incorrect.");
        }

        
        // ------------------------------
        // ----CHecking Links-----------
        // ------------------------------
        // Verify the title of the new page
        WebElement button4 = null;
        try {
            button4 = driver.findElement(By.className("average-button"));
            System.out.println("FAILED: Button exists on the page.");
        } catch (org.openqa.selenium.NoSuchElementException e) {
            System.out.println("PASSED: Button does not exist on the page.");
        }
        button4.click();
        String expectedTitle = "Assignment 5:GUI Testing:Quiz";
        String actualTitle = driver.getTitle();
        if (actualTitle.equals(expectedTitle)) {
            System.out.println("PASSED: Title verification passed. The title of the new page is correct. The link to the new page is working.");
        } else {
            System.out.println("FAILED: Title verification failed. The title of the new page is incorrect. The link to the new page is NOT working.");
        }
        } else {
            System.out.println("FAILED: Could not reach the result page after " + maxIterations + " iterations.");
        }


        driver.quit();
    }
    private static boolean isBelow(WebElement element1, WebElement element2) {
      int element1Bottom = element1.getLocation().getY() + element1.getSize().getHeight();
      int element2Top = element2.getLocation().getY();
      return element1Bottom <= element2Top;
  }
}
