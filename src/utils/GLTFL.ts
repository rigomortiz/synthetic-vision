class GLTFL {
	static async load(url: string): Promise<any> {
		const response = await fetch(url);
		const json = await response.json();
		return json;
	}

	static dumpObject(obj: any, lines: string[] = [], isLast = true, prefix = '') {
	    const localPrefix = isLast ? '└─' : '├─';
	    lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
	    const newPrefix = prefix + (isLast ? '  ' : '│ ');
	    const lastNdx = obj.children.length - 1;
	    obj.children.forEach((child: any, ndx: any) => {
	      const isLast = ndx === lastNdx;
	      this.dumpObject(child, lines, isLast, newPrefix);
	    });
	    return lines;
	}
}

export default GLTFL;