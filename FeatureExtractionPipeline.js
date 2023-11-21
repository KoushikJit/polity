import { pipeline, env } from '@xenova/transformers';

export class FeatureExtractionPipelineClass {
    static task = "feature-extraction";
    static model = "Xenova/bge-large-en-v1.5";
    static instance = null;
  
    static async getInstance(progress_callback = null) {
      if (this.instance === null) {
        // NOTE: Uncomment this to change the cache directory
        env.cacheDir = './public';
  
        this.instance = pipeline(this.task, this.model, { progress_callback });
      }
  
      return this.instance;
    }
  }