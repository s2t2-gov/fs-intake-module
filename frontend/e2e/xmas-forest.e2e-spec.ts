import { TreesSidebarPage } from './app.po';
import { browser, element, by, Key, protractor } from 'protractor';


describe('Xmas tree - Forest', () => {
  let page: TreesSidebarPage;

  describe( 'Shoshone - Rules To Know', () => {
    beforeEach(() => {
      page = new TreesSidebarPage();
      browser.driver.manage().window().setSize(1400, 900);
      page.navigateTo('shoshone');
      browser.sleep(800);
      expect<any>(page.rulesToKnowSectionLink().isPresent()).toBeTruthy();
      page.rulesToKnowSectionLink().click();
      browser.sleep(100);
      expect<any>(page.rulesToKnowSection().isPresent()).toBeTruthy();
    });

    it('should display additional height information', () => {
      expect<any>(element(by.id('allow-additional-height-info')).isPresent()).toBeTruthy();
    });

  });

  describe( 'Arapaho - Rules To Know', () => {
    beforeEach(() => {
      page = new TreesSidebarPage();
      browser.driver.manage().window().setSize(1400, 900);
      page.navigateTo('arp');
      browser.sleep(800);
      expect<any>(page.rulesToKnowSectionLink().isPresent()).toBeTruthy();
      page.rulesToKnowSectionLink().click();
      browser.sleep(100);
      expect<any>(page.rulesToKnowSection().isPresent()).toBeTruthy();
    });

    it('should not display additional height information', () => {
      expect<any>(element(by.id('allow-additional-height-info')).isPresent()).toBeFalsy();
    });

  });

});
