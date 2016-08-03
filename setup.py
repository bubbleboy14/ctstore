from setuptools import setup

setup(
    name='ctstore',
    version="0.1.4",
    author='Mario Balibrera',
    author_email='mario.balibrera@gmail.com',
    license='MIT License',
    description='E-commerce plugin for cantools (ct)',
    long_description='This package enables the developer to create a basic ecommerce website with nothing but configuration.',
    packages=[
        'ctstore'
    ],
    zip_safe = False,
    install_requires = [
        "ct >= 0.8.2.9"
    ],
    entry_points = '''''',
    classifiers = [
        'Development Status :: 3 - Alpha',
        'Environment :: Console',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Topic :: Software Development :: Libraries :: Python Modules'
    ],
)
